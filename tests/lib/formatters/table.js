/**
 * @fileoverview Tests for "table" reporter.
 * @author Gajus Kuizinas <gajus@gajus.com>
 * @copyright 2016 Gajus Kuizinas <gajus@gajus.com>. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert,
    formatter;

assert = require("chai").assert;
formatter = require("../../../lib/formatters/table");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("formatter:table", function() {
    describe("when passed no messages", function() {
        var code;

        code = [
            {
                filePath: "foo.js",
                messages: [],
                errorCount: 0,
                warningCount: 0
            }
        ];

        it("should return a table of error and warning count with no messages", function() {
            var expectedOutput,
                result;

            expectedOutput = [
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 0 Errors                                                                                                       ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 0 Warnings                                                                                                     ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });
    });

    describe("when passed a single message", function() {
        it("should return a string in the correct format for errors", function() {
            var expectedOutput,
                code,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            message: "Unexpected foo.",
                            severity: 2,
                            line: 5,
                            column: 10,
                            ruleId: "foo"
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 5        │ 10       │ error    │ Unexpected foo.                                        │ foo                  ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 1 Error                                                                                                        ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 0 Warnings                                                                                                     ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });

        it("should return a string in the correct format for warnings", function() {
            var expectedOutput,
                code,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            message: "Unexpected foo.",
                            severity: 1,
                            line: 5,
                            column: 10,
                            ruleId: "foo"
                        }
                    ],
                    errorCount: 0,
                    warningCount: 1
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 5        │ 10       │ warning  │ Unexpected foo.                                        │ foo                  ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 0 Errors                                                                                                       ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 1 Warning                                                                                                      ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);
            assert.equal(result, expectedOutput);
        });
    });

    describe("when passed a fatal error message", function() {
        it("should return a string in the correct format", function() {
            var code,
                expectedOutput,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            fatal: true,
                            message: "Unexpected foo.",
                            line: 5,
                            column: 10,
                            ruleId: "foo"
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 5        │ 10       │ error    │ Unexpected foo.                                        │ foo                  ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 1 Error                                                                                                        ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 0 Warnings                                                                                                     ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });
    });

    describe("when passed multiple messages", function() {
        it("should return a string with multiple entries", function() {
            var code,
                expectedOutput,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            message: "Unexpected foo.",
                            severity: 2,
                            line: 5,
                            column: 10,
                            ruleId: "foo"
                        },
                        {
                            message: "Unexpected bar.",
                            severity: 1,
                            line: 6,
                            column: 11,
                            ruleId: "bar"
                        }
                    ],
                    errorCount: 1,
                    warningCount: 1
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 5        │ 10       │ error    │ Unexpected foo.                                        │ foo                  ║",
                "║ 6        │ 11       │ warning  │ Unexpected bar.                                        │ bar                  ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 1 Error                                                                                                        ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 1 Warning                                                                                                      ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });
    });

    describe("when passed multiple files with 1 message each", function() {
        it("should return a string with multiple entries", function() {
            var code,
                expectedOutput,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            message: "Unexpected foo.",
                            severity: 2,
                            line: 5,
                            column: 10,
                            ruleId: "foo"
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }, {
                    filePath: "bar.js",
                    messages: [
                        {
                            message: "Unexpected bar.",
                            severity: 1,
                            line: 6,
                            column: 11,
                            ruleId: "bar"
                        }
                    ],
                    errorCount: 0,
                    warningCount: 1
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 5        │ 10       │ error    │ Unexpected foo.                                        │ foo                  ║",
                "",
                "bar.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 6        │ 11       │ warning  │ Unexpected bar.                                        │ bar                  ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 1 Error                                                                                                        ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 1 Warning                                                                                                      ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });
    });

    describe("when passed one file not found message", function() {
        it("should return a string without line and column (0, 0)", function() {
            var code,
                expectedOutput,
                result;

            code = [
                {
                    filePath: "foo.js",
                    messages: [
                        {
                            fatal: true,
                            message: "Couldn't find foo.js."
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }
            ];

            expectedOutput = [
                "",
                "foo.js",
                "",
                "║ Line     │ Column   │ Type     │ Message                                                │ Rule ID              ║",
                "╟──────────┼──────────┼──────────┼────────────────────────────────────────────────────────┼──────────────────────╢",
                "║ 0        │ 0        │ error    │ Couldn't find foo.js.                                  │                      ║",
                "",
                "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
                "║ 1 Error                                                                                                        ║",
                "╟────────────────────────────────────────────────────────────────────────────────────────────────────────────────╢",
                "║ 0 Warnings                                                                                                     ║",
                "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
                ""
            ];

            expectedOutput = expectedOutput.join("\n");

            result = formatter(code);

            assert.equal(result, expectedOutput);
        });
    });
});
