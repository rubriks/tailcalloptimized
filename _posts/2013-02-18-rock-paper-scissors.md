---
layout: post
title: "Rock Paper Scissors"
description:
date: 2013-02-18 16:20:27
assets: assets/posts/2013-02-18-rock-paper-scissors
image: 
---

<p>This time at <a href="http://sys5.litemedia.se">sharpen your saw</a>, I had prepared a server that would accept players, playing "Rock Paper Scissors" over TCP sockets. The task was to create a client that would play rock paper scissors and win as many of played matches as possible.</p>
<p>The most interesting thing for me was creating the server in a functional manner. F# makes this pretty nicely.</p>
<pre class="brush:fsharp">module RockPaperScissors.Server

open System.Net.Sockets
open System.Net
open Reporting

// constants

[<Literal>]
let helloMessage = "hello, what is your name"
[<Literal>]
let letsPlayMessage = "let's play"

// utility functions
let config = System.Configuration.ConfigurationManager.AppSettings

// convert string to byte array
// toBytes "hello" -> [|104uy; 101uy; 108uy; 108uy; 111uy|]
let toBytes (s : string) = System.Text.Encoding.ASCII.GetBytes(s)

// convert byte array to string
// toString [|104uy; 101uy; 108uy; 108uy; 111uy|] -> "hello"
let toString b = System.Text.Encoding.ASCII.GetString(b)

// WriteLine string and return it
// printReturn "hello" -> "hello"
let printReturn s = printf "> %s\n" s; s

// read message from socket
let read client =
    // buffered read
    let rec _read (buffer : byte[]) (client : Socket) =
        // fill buffer with data from network stream
        let readLength = client.Receive(buffer)
        // buffer was filled
        if  readLength = buffer.Length then
            // convert buffer to string and add it with reading rest of string
            (buffer |> toString) + (_read (Array.zeroCreate<byte> buffer.Length) client)

        // buffer was not filled, reached end of stream
        else
            // return rest of buffer as string
            toString <| buffer.[..readLength - 1]

    // read message from socket with a buffer of 32 bytes
    client |> _read (Array.zeroCreate<byte> 32) |> printReturn

// write message to socket
let write message (client : Socket) =
        printf "< %s\n" message
        client.Send(message |> toBytes) |> ignore

// start game with two clients
let gameProtocol (client1 : Socket) (client2 : Socket) = async {
        try
            try
                // handshake
                do client1 |> write helloMessage // hello
                let player1 = client1 |> read 
        
                do client2 |> write helloMessage // hello
                let player2 = client2 |> read

                do client1 |> write (sprintf "opponent %s" player2)
                do client2 |> write (sprintf "opponent %s" player1)
        
                do client1 |> write letsPlayMessage // let's play
                do client2 |> write letsPlayMessage // let's play

                // play 
                let move1 = client1 |> read
                let move2 = client2 |> read

                let winner =
                    match move1, move2 with
                    | "rock", "rock"         -> None
                    | "rock", "scissors"     -> Some(player1)
                    | "rock", "paper"        -> Some(player2)
                    | "scissors", "rock"     -> Some(player2)
                    | "scissors", "scissors" -> None
                    | "scissors", "paper"    -> Some(player1)
                    | "paper", "rock"        -> Some(player1)
                    | "paper", "paper"       -> None
                    | "paper", "scissors"    -> Some(player2)
                    | x, y                   -> failwith "protocol failure"

                // report who the winner is
                let winnerString =  if winner.IsSome then winner.Value else "none"
                do client1 |> write (sprintf "%s wins" winnerString)
                do client2 |> write (sprintf "%s wins" winnerString)
                
                // report to database
                let report = new dbSchema.ServiceTypes.Games(Player1 = player1, Player2 = player2, Winner = winnerString)
                Async.StartAsTask(Reporting.send(report)) |> ignore

            with
            | :? System.Net.Sockets.SocketException as e -> printf "%s\n" e.Message

        finally
            client1.Close()
            client2.Close()
    }

let acceptClient ip port = 
    printf "%s:%d\n" ip port
    let server = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
    let endpoint = new IPEndPoint(IPAddress.Parse(ip), port);
    server.Bind(endpoint)
    server.Listen(100)
    while true do
        printf "waiting for connections\n"
        let client1 = server.Accept() // wait
        printf "client connected\n"
        let client2 = server.Accept() // wait
        printf "client connected\n"
        Async.Start (gameProtocol client1 client2)

[<EntryPoint>]
let main argv = 
    acceptClient config.["interface"] (config.["port"] |> int)
    0 // return an integer exit code</pre>
<p>I also created a client for testing the server. This is a naive solution and not to be considered production ready code.</p>
<pre class="brush:csharp">class Program
{
/// <summary>
/// Read message from socket
/// </summary>
static string Read(Socket socket)
{
    var result = new List<byte>();
    var buffer = new byte[32];
    int i;
    while ((i = socket.Receive(buffer)) == buffer.Length)
    {
        result.AddRange(buffer);
    }

    result.AddRange(buffer.Take(i));
    return Encoding.ASCII.GetString(result.ToArray());
}

/// <summary>
/// Write message to socket
/// </summary>
static void Write(Socket socket, string message)
{
    socket.Send(Encoding.ASCII.GetBytes(message));
}

static void Play(string server, int port, string playerName)
{
    var socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

    try
    {
        var endpoint = new IPEndPoint(IPAddress.Parse(server), port);

        socket.Connect(endpoint);

        Console.WriteLine(Read(socket)); // hello
        Write(socket, playerName);
        Console.WriteLine(Read(socket)); // opponent
        Console.WriteLine(Read(socket)); // let's play

        var options = new[] {"rock", "paper", "scissors"};
        var rand = new Random(DateTime.Now.Millisecond).Next(options.Length);
        Console.WriteLine(options[rand]);
        Write(socket, options[rand]);

        Console.WriteLine(Read(socket)); // .. wins
    }
    catch (SocketException e)
    {
        Console.Error.WriteLine(e.Message);
    }
    finally
    {
        socket.Close();
    }
}

static void Main(string[] args)
{
    var server = args[0];
    var port = int.Parse(args[1]);
    var playerName = args[2];

    while (true)
    {
        Play(server, port, playerName);
    }
}</pre>
<p>This was the most high risk task I've done in sharpen your saw. The main risk was getting the server up an running on an unknown network. It took me 30 minutes after some port forwarding to get it reachable. The second risk was if unix machines would be able to talk to Windows machines over TCP sockets or if there would be a format issue. The NodeJS guys had no problem what so ever, but the Ruby crowd couldn't get it to work.</p>
<p>It was an interesting experiment!</p>
