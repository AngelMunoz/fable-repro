# Import "/env.js" Fable Repro

Fable seems to resolve some paths when importing javascript files that have an extension

e.g. `import "FOO" "./env.js" will output something like the following

```js
import { FOO as FOO_1 } from "./env.js";
```

Which is completely fine, the problem arises when one wants to import from the root of a server

e.g. `import "FOO /env.js` will output something like the following

```js
import { FOO as FOO_1 } from "../../../../../env.js";
```

which in most cases it won't break anything but it doesn't respect how ESModule imports work in the browser.

As an Extra point if you use a dynamic import, fable doesn't follow this behavior

```fsharp
let fooP: JS.Promise<unit> =
    importDynamic "/env.js"
    |> fun p -> p.``then`` (fun (f: obj) -> printfn "%A" f?FOO)
```

will output something like

```js
export const fooP = (() => {
  const p = import("/env.js");
  return p.then((f) => {
    const arg = f.FOO;
    toConsole(printf("%A"))(arg);
  });
})();
```

As you can see, `/env.js` is preserved in the dynamic import output which respects ESModules imports in the browser as well.

## Run repro

- `dotnet tool restore`
- `PERLA_FOO=bar dotnet perla serve`
  - Windows/Powershell `$env:PERLA_FOO = "bar"; dotnet perla serve`
- Check the compiled `Main.fs.js` file next to `Main.fs`
- Visit http://localhost:7331 and check the console for "bar"

While the dev server can resolve the path for `"../../../../../env.js"` the original `/env.js` path should be respected by Fable
