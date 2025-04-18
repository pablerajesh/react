// jest.setup.ts
import { TextDecoder, TextEncoder } from "util";

// If desired, you can declare these global properties to help TypeScript know about them.
declare global {
    // This augments the type definition of NodeJS.Global
    namespace NodeJS {
        interface Global {
            TextEncoder: typeof TextEncoder;
            TextDecoder: typeof TextDecoder;
        }
    }
}

// Check and assign if not already present.
if (typeof global.TextEncoder === "undefined") {
    // Using a type assertion (global as any) if necessary.
    (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
    (global as any).TextDecoder = TextDecoder;
}
