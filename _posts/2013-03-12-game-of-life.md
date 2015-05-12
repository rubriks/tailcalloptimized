---
layout: migratedpost
title: "Game of Life"
description:
date: 2013-03-12 17:39:37
assets: assets/posts/2013-03-12-game-of-life
image: 
---

<p>I told you yesterday <a href="http://litemedia.info/unit-testing-in-fsharp">what a test suite in F# could look like</a>. Today I will show you the difference between immutable solution of Game of Life in F# and an imperative mutable solution in C#.</p>
<p>First, the F# code. The solution is completely immutable.</p>
<pre class="brush:fsharp">module Run =
    // get an area as a tuple array
    // area [-1..1] [-1..1] = [(-1, -1); (-1, 0); (-1, 1); (0, -1); (0, 0); (0, 1); (1, -1); (1, 0); (1, 1)]
    let private area xs ys = xs |> List.collect (fun x -> ys |> List.map (fun y -> x, y))

    // get all neighbour coordinates surrounding a cell
    // neighbours (0, 0) = [(-1, -1); (-1, 0); (-1, 1); (0, -1); (0, 1); (1, -1); (1, 0); (1, 1)]
    let private neighbours cell = 
        let x, y = cell
        // get area around cell
        area [x - 1..x + 1] [y - 1..y + 1] 
        // remove the cell itself
        |> List.filter ((<>) cell)

    // intersection
    // neighbours (0, 0) |> live [0, 0; 0, 1; 1, 0] = [0, 1; 1, 0]
    let private live cells = List.filter (fun cell -> cells |> List.exists ((=) cell))

    // difference
    // neighbours (0, 0) |> dead [0, 0; 0, 1; 1, 0] = [-1, -1; -1, 0; -1, 1; 0, -1; 1, -1; 1, 1]
    let private dead cells = List.filter (fun cell -> not (cells |>  List.exists ((=) cell)))

    // run next iteration of the game
    let next cells =

        // kill or preserve live cells
        let rec weed = function
        | [] -> []
        // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        | hd :: tl when (neighbours hd |> live cells).Length < 2 -> weed tl
        // 2. Any live cell with two or three live neighbours lives on to the next generation.
        | hd :: tl when (neighbours hd |> live cells).Length < 4 -> hd :: weed tl
        // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
        | hd :: tl -> weed tl

        // grow new cells where number of live neighbours is 3
        let rec grow = function
        | [] -> []
        // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        | hd :: tl when (neighbours hd |> live cells).Length = 3 -> hd :: grow tl
        // else recurse
        | hd :: tl -> grow tl

        // get all dead cells surrounding live cells
        let dead cells = List.collect (neighbours >> dead cells) cells |> Set.ofList |> Set.toList

        // grow cells from dead cells, and join with weeding out live cells
        grow (dead cells) @ (weed cells)</pre>
<p>Is it readable? It should really be read from the bottom up. "grow dead cells & weed cells" This is what game of life is really about. All the four rules are represented in the main function "next".</p>
<p>What does a mutable imperative version of this look like?</p>
<pre class="brush:csharp">namespace GameOfLife.CSharp
{
    using System.Globalization;

    /// <summary>
    /// One coordinate on the board
    /// </summary>
    public class Cell
    {
        public Cell(int x, int y)
        {
            X = x;
            Y = y;
        }

        /// <summary>
        /// X-coordinate of this cell
        /// </summary>
        public int X { get; set; }

        /// <summary>
        /// Y-coordinate of this cell
        /// </summary>
        public int Y { get; set; }
    }
}

namespace GameOfLife.CSharp
{
    using System.Collections.Generic;
    using System.Linq;

    public static class Neighbours
    {
        /// <summary>
        /// Get all neighbouring cells of cell
        /// </summary>
        public static IEnumerable<Cell> Of(Cell cell)
        {
            // iterate coordinates around cell
            for (var y = cell.Y - 1; y < cell.Y + 2; y++)
            for (var x = cell.X - 1; x < cell.X + 2; x++)
            {
                // skip cell itself
                if (x == cell.X && y == cell.Y)
                {
                    continue;
                }

                yield return new Cell(x, y);
            }
        }

        /// <summary>
        /// Intersection between cells and board (is live cells)
        /// </summary>
        public static IEnumerable<Cell> FilterLive(this IEnumerable<Cell> cells, IEnumerable<Cell> board)
        {
            return cells.Where(board.Contains);
        }

        /// <summary>
        /// Difference between cells and board (is dead cells)
        /// </summary>
        public static IEnumerable<Cell> FilterDead(this IEnumerable<Cell> cells, IEnumerable<Cell> board)
        {
            return cells.Where(cell => !board.Contains(cell));
        }
    }
}

namespace GameOfLife.CSharp
{
    using System.Collections.Generic;
    using System.Linq;
    
    /// <summary>
    /// Play's game of life
    /// </summary>
    public class Game
    {
        private readonly List<Cell> board; 

        public Game()
            : this(new List<Cell>())
        {   
        }

        /// <param name="board">Initial state</param>
        public Game(IEnumerable<Cell> board)
        {
            this.board = new List<Cell>(board);
        }

        /// <summary>
        /// Current board
        /// </summary>
        public IEnumerable<Cell> Board
        {
            get { return board; }
        }

        /// <summary>
        /// Get next turn of the game
        /// </summary>
        public void Next()
        {
            lock (board)
            {
                var nextBoard = new List<Cell>(Board);
            
                foreach (var cell in nextBoard)
                {
                    var liveNeighboursCount = Neighbours.Of(cell).FilterLive(nextBoard).Count();

                    // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                    if (liveNeighboursCount < 2)
                    {
                        this.board.Remove(cell);
                    }

                    // 2. Any live cell with two or three live neighbours lives on to the next generation.
                    // essentially do nothing

                    // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
                    if (liveNeighboursCount > 3)
                    {
                        this.board.Remove(cell);
                    }
                }

                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                var newCells = nextBoard.SelectMany(
                    cell => Neighbours.Of(cell).FilterDead(nextBoard)
                        .Where(dead => Neighbours.Of(dead).FilterLive(nextBoard).Count() == 3));

                foreach (var cell in newCells.Distinct())
                {
                    board.Add(cell);
                }
            }
        }
    }
}</pre>
<p>I find this code scary. After so much functional programming, having a state and changing it scares me. It is so prone to errors. Can you find any more problems with the C# version of this program?</p>
