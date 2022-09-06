module Main

open Components
open Fable.Core
open Fable.Core.JsInterop

importSideEffects "./styles.css"

let foo: string = import "FOO" "/env.js"
let FOO: string = importMember "/env.js"

let fooP: JS.Promise<unit> =
    importDynamic "/env.js"
    |> fun p -> p.``then`` (fun (f: obj) -> printfn "%A" f?FOO)


printfn "%s" foo

// register your custom elements here
Counter.register ()
Navbar.register ()
App.start ()
