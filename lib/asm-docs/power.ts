// Copyright (c) 2024, Compiler Explorer Authors
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import {AssemblyInstructionInfo, BaseAssemblyDocumentationProvider} from './base.js';
import {getAsmOpcode, reduceOpcode} from './generated/asm-docs-power.js';

export class PowerDocumentationProvider extends BaseAssemblyDocumentationProvider {
    public static get key() {
        return 'powerpc';
    }

    public override getInstructionInformation(instruction: string): AssemblyInstructionInfo | null {
        // Attempt to reduce an extended mnemonic to a base instruction.
        const reduced = reduceOpcode(instruction);
        // Get the documentation for the reduced instruction.
        const asm = getAsmOpcode(reduced);
        // If there's no documentation, abandon ship.
        if (!asm) return null;
        // If the reduced instruction and base instruction are the same, return the unmodified documentation.
        if (instruction === reduced) return asm;
        // Otherwise, construct a modified documentation that clarifies the difference.
        return {
            html: asm.html,
            tooltip: `${asm.tooltip} (Base Instruction for Extended Mnemonic ${instruction.toUpperCase()})`,
            url: asm.url,
        };
    }
}
