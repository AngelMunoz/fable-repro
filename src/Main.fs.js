import { FOO as FOO_1 } from "../../../../../env.js";
import { printf, toConsole } from "./fable_modules/fable-library.3.7.18/String.js";
import { register } from "./Components/Counter.fs.js";
import { register as register_1 } from "./Components/Navbar.fs.js";
import { start } from "./App.fs.js";
import "./styles.css";


export const foo = FOO_1;

export const FOO = FOO_1;

export const fooP = (() => {
    const p = import("/env.js");
    return p.then((f) => {
        const arg = f.FOO;
        toConsole(printf("%A"))(arg);
    });
})();

toConsole(printf("%s"))(foo);

register();

register_1();

start();

