---
layout: migratedpost
title: "Unit testing in F#"
description:
date: 2013-03-11 05:23:47
assets: assets/posts/2013-03-11-unit-testing-in-fsharp
image: 
---

<p>I'm one really into testing. I love it. I love refactoring and I love the structure I get from testing. But always there's this wall between the tests and the reality. Most often it is the programming language that stands in your way, and you have to write test names like this.</p>
<pre class="brush:csharp">public class GameOfLife
{
     public void CellsWithNoNeighboursShouldDie() { ... }
}</pre>
<p>The main problem here is readability. Language constructs (public class/void) and limitations (pascal case) stands in your way of readability. This is both in writing the test and reading the test output.</p>
<p>What test output really should look like is this</p>
<p><img src="/Media/Default/BlogPost/c8bv.png" alt="unit test output from fsunit" width="690" height="704" /></p>
<p>You can accieve this by writing your tests in F#. I have done so here with the frameworks <a href="https://github.com/dmohl/FsUnit">FSUnit</a> and <a href="http://xunit.codeplex.com/">xUnit</a>. This is what the test code looks like.</p>
<pre class="brush:fsharp">namespace GameOfLife

module TestHelpers =
    open NHamcrest
    let intersect list = CustomMatcher<obj>(sprintf "Intersect %A" list, fun a -> list |> List.forall (fun item -> (unbox a) |> List.exists ((=) item)))

// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
namespace ``1 Any live cell with fewer than two live neighbours dies as if caused by under-population``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife

    type ``Given a cell with no neighbours`` () =
        [<Fact>]
        let ``when turn is run, the cell dies`` () =
            Run.next [0, 0] |> should equal List.empty<int * int>

    type ``Given two cells that are each other neighbours`` () =
        [<Fact>]
        let ``when turn is run, the cells dies`` () =
            Run.next [0, 0; 0, 1] |> should equal List.empty<int * int>

    type ``Given two cells that are not each other neighbours`` () =
        [<Fact>]
        let ``when turn is run, the cells dies`` () =
            Run.next [0, 0; 0, 2] |> should equal List.empty<int * int>

    type ``Given three cells where two are neighbours and one alone`` () =
        [<Fact>]
        let ``when turn is run, none lives on`` () =
            Run.next [0, 0; 0, 1; 3, 3] |> should equal List.empty<int * int>

// 2. Any live cell with two or three live neighbours lives on to the next generation.
namespace ``2 Any live cell with two or three live neighbours lives on to the next generation``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife
    open TestHelpers

    type ``Given three cells that are each others neighbours`` () =
        let row = [0, 0; 0, 1; 1, 0]

        [<Fact>]
        let ``when turn is run, the cells lives on`` () =
            Run.next row |> should intersect row

    type `` Given four cells in a cluster`` () =
        [<Fact>]
        let ``when turn is run, all lives on`` () =
            let cluster = [0, 0; 0, 1; 1, 0; 1, 1]
            Run.next cluster |> should equal cluster

    type ``Given four cells on a row`` () =
        let row = [0, 0; 1, 0; 2, 0; 3, 0]

        [<Fact>]
        let ``when turn is run, two in the middle lives on`` () =
            Run.next row |> should intersect [1, 0; 2, 0]

// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
namespace ``3 Any live cell with more than three live neighbours dies as if by overcrowding``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife
    open TestHelpers

    type ``Given a 3x3 block of cells`` () =
        let row = [(-1, -1); (-1, 0); (-1, 1); (0, -1); (0, 0); (0, 1); (1, -1); (1, 0); (1, 1)]

        [<Fact>]
        let ``when first turn is run, the corners will remain`` () =
            Run.next row |> should intersect [-1, -1; -1, 1; 1, -1; 1, 1]

namespace ``4 Any dead cell with exactly three live neighbours becomes a live cell as if by reproduction``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife
    open TestHelpers

    type ``Given a dead cell with three (not neighbours) as neighbours`` () =
        [<Fact>]
        let ``when turn is run, the dead cell becomes live and lonely cells dies`` () =
            Run.next [0, 0; -1, -2; 1, -2] |> should equal [0, -1]

    type ``Given a row of three cells`` () =
        [<Fact>]
        let ``when turn is run, the two dead cells over and under the middle cell becomes live cells`` () =
            Run.next [-1, 0; 0, 0; 1, 0] |> should intersect [0, 1; 0, -1]

namespace ``Examples: Still lifes``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife

    type ``Given a block of four cells`` () =
        let block = [0, 0; 1, 0; 1, 1; 0, 1]

        [<Fact>]
        let ``when turn is run, the state doesn't change`` () =
            Run.next block |> should equal block

    type ``Given a beehive of six cells`` () =
        let beehive = [0, 0; 1, 1; 2, 1; 3, 0; 2, -1; 1, -1]

        [<Fact>]
        let ``when turn is run, the state doesn't change`` () =
            Run.next beehive |> should equal beehive

    type ``Given a loaf of seven cells`` () =
        let loaf = [1, 0; 2, 0; 3, -1; 3, -2; 2, -3; 1, -2; 0, -1]

        [<Fact>]
        let ``when turn is run, the state doesn't change`` () =
            Run.next loaf |> should equal loaf

    type ``Given a boat of five cells`` () =
        let boat = [0, 0; 1, 0; 2, -1; 1, -2; 0, -1]

        [<Fact>]
        let ``when turn is run, the state doesn't change`` () =
            Run.next boat |> should equal boat

namespace ``Examples: Oscillators``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife

    type ``Given a blinker of three cells`` () =
        let blinker = [-1, 0; 0, 0; 1, 0]

        [<Fact>]
        let ``when first turn is run, the blinker becomes horizontal`` () =
            Run.next blinker |> List.sort |> should equal [0, -1; 0, 0; 0, 1]

        [<Fact>]
        let ``when second turn is run, the blinker goes back to its original state`` () =
            blinker |> Run.next |> Run.next  |> List.sort |> should equal blinker

    type ``Given a toad of six cells`` () =
        let toad = [0, -1; 1, -1; 1, 0; 2, -1; 2, 0; 3, 0]

        [<Fact>]
        let ``when first turn is run, the toad explodes`` () =
            Run.next toad |> List.sort |> should equal [0, -1; 0, 0; 1, -2; 2, 1; 3, -1; 3, 0]

        [<Fact>]
        let ``when second turn is run, the toad returns to its initial state`` () =
            toad |> Run.next |> Run.next |> List.sort |> should equal toad

    type ``Given a beacon of six cells`` () =
        let beacon = [0, -1; 0, 0; 1, 0; 2, -3; 3, -3; 3, -2]

        [<Fact>]
        let ``when first turn is run, will complete the beacon with two additional cells`` () =
            Run.next beacon |> List.sort |> should equal [0, -1; 0, 0; 1, -1; 1, 0; 2, -3; 2, -2; 3, -3; 3, -2]

        [<Fact>]
        let ``when second turn is run, the beacon returns to its initial state`` () =
            beacon |> Run.next |> Run.next |> List.sort |> should equal beacon

    type ``Given a pulsar of 48 cells`` () =
        let pulsar = 
            [
                [2, 0; 3, 0; 4, 0; 8, 0; 9, 0; 10, 0];
                [0, -2; 5, -2; 7, -2; 12, -2];
                [0, -3; 5, -3; 7, -3; 12, -3];
                [0, -4; 5, -4; 7, -4; 12, -4];
                [2, -5; 3, -5; 4, -5; 8, -5; 9, -5; 10, -5];
                [2, -7; 3, -7; 4, -7; 8, -7; 9, -7; 10, -7];
                [0, -8; 5, -8; 7, -8; 12, -8];
                [0, -9; 5, -9; 7, -9; 12, -9];
                [0, -10; 5, -10; 7, -10; 12, -10];
                [2, -12; 3, -12; 4, -12; 8, -12; 9, -12; 10, -12]
            ] |> List.collect (fun a -> a) |> List.sort

        [<Fact>]
        let ``when third turn is run, the pulsar returns to its initial state`` () =
            pulsar |> Run.next |> Run.next |> Run.next |> List.sort |> should equal pulsar

namespace ``Examples: Spaceships``
    open Xunit;
    open FsUnit.Xunit;
    open GameOfLife

    type ``Given a glider of 5 cells`` () =
        let glider = [0, -2; 1, -2; 1, 0; 2, -2; 2, -1]

        [<Fact>]
        let ``when fourth turn is run, the glider has moved 1 point right and 1 point down`` () =
            glider |> Run.next |> Run.next |> Run.next |> Run.next |> List.sort
            |> should equal (glider |> List.map (fun (x, y) -> x + 1, y - 1))

    type ``Given a lightweight spaceship of 9 cells`` () =
        let lwss = [0, -2; 0, 0; 1, -3; 2, -3; 3, -3; 3, 0; 4, -3; 4, -2; 4, -1]

        [<Fact>]
        let ``when fourth turn is run, the lightweight spaceship has moved 2 points to the right`` () =
            lwss |> Run.next |> Run.next |> Run.next |> Run.next |> List.sort
            |> should equal (lwss |> List.map (fun (x, y) -> x + 2, y))</pre>
<p>Pretty neat, huh!?</p>
