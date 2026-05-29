/* @ts-self-types="./coherence_kernel.d.ts" */
import * as wasm from "./coherence_kernel_bg.wasm";
import { __wbg_set_wasm } from "./coherence_kernel_bg.js";

__wbg_set_wasm(wasm);

export {
    CoherenceKernel
} from "./coherence_kernel_bg.js";
