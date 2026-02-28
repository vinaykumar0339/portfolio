"use client";

import { useMemo, useState } from "react";
import {
  JexEvaluator,
  type Context,
  type FuncImpl,
  type JexValue,
  type TransformImpl
} from "jexlang-ts";
import { Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_EXPRESSION =
  "let subtotal = price * quantity; let discounted = applyDiscount(subtotal, discountRate); discounted | formatCurrency";

const DEFAULT_VARIABLES = `{
  "price": 120,
  "quantity": 3,
  "discountRate": 0.15,
  "user": "Vinay"
}`;

const DEFAULT_FUNCTIONS = `{
  "applyDiscount": (amount, rate) => Math.max(amount * (1 - rate), 40),
  "greeting": (name) => "Hello, " + name + "!"
}`;

const DEFAULT_TRANSFORMS = `{
  "formatCurrency": (input) => "$" + Number(input).toFixed(2),
  "toUpper": (input) => String(input).toUpperCase()
}`;

type UserFunction = (...args: unknown[]) => JexValue;
type UserFunctionMap = Record<string, UserFunction>;
type RuntimeFunctionMap = Record<string, FuncImpl>;
type RuntimeTransformMap = Record<string, TransformImpl>;

function parseFunctionMap(source: string, label: string): UserFunctionMap {
  const text = source.trim();
  if (!text) {
    return {};
  }

  const blacklist =
    /(import|require|process|window|globalThis|Function\s*\(|eval\s*\(|constructor|prototype|__proto__)/i;

  if (blacklist.test(text)) {
    throw new Error(`${label} contains restricted keywords.`);
  }

  let parsed: unknown;
  try {
    parsed = new Function(`"use strict"; return (${text});`)();
  } catch (err) {
    throw new Error(
      `${label} parse failed: ${err instanceof Error ? err.message : "Invalid syntax"}`
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} must be a JavaScript object.`);
  }

  const parsedMap = parsed as Record<string, unknown>;

  for (const [name, fn] of Object.entries(parsedMap)) {
    if (typeof fn !== "function") {
      throw new Error(`${label} entry '${name}' must be a function.`);
    }
  }

  return parsedMap as UserFunctionMap;
}

function buildCustomFunctions(functionsSourceText: string): RuntimeFunctionMap {
  const userFns = parseFunctionMap(functionsSourceText, "Custom functions");
  const result: RuntimeFunctionMap = {};

  for (const [name, fn] of Object.entries(userFns)) {
    // JexLang calls function as (ctx, ...args). UI functions are defined as (...args), so ctx is omitted here.
    result[name] = (ctx, ...args) => fn(...args, ctx);
  }

  return result;
}

function buildCustomTransforms(transformsSourceText: string): RuntimeTransformMap {
  const userTransforms = parseFunctionMap(transformsSourceText, "Custom transforms");
  const result: RuntimeTransformMap = {};

  for (const [name, fn] of Object.entries(userTransforms)) {
    // JexLang transform signature is (input, ctx). User can define either (input) or (input, ctx).
    result[name] = (input, ctx) => fn(input, ctx);
  }

  return result;
}

export function JexlangPlayground() {
  const [expression, setExpression] = useState(DEFAULT_EXPRESSION);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [functionsSource, setFunctionsSource] = useState(DEFAULT_FUNCTIONS);
  const [transformsSource, setTransformsSource] = useState(DEFAULT_TRANSFORMS);
  const [result, setResult] = useState("-");
  const [error, setError] = useState("");

  const variableStatus = useMemo(() => {
    try {
      JSON.parse(variables);
      return { ok: true, message: "Valid JSON" };
    } catch (err) {
      return {
        ok: false,
        message: err instanceof Error ? err.message : "Invalid JSON"
      };
    }
  }, [variables]);

  const functionStatus = useMemo(() => {
    try {
      buildCustomFunctions(functionsSource);
      return { ok: true, message: "Function object parsed successfully" };
    } catch (err) {
      return {
        ok: false,
        message: err instanceof Error ? err.message : "Invalid function object"
      };
    }
  }, [functionsSource]);

  const transformStatus = useMemo(() => {
    try {
      buildCustomTransforms(transformsSource);
      return { ok: true, message: "Transform object parsed successfully" };
    } catch (err) {
      return {
        ok: false,
        message: err instanceof Error ? err.message : "Invalid transform object"
      };
    }
  }, [transformsSource]);

  async function runDemo() {
    setError("");

    try {
      const vars = JSON.parse(variables) as Context;
      const customFunctions = buildCustomFunctions(functionsSource);
      const customTransforms = buildCustomTransforms(transformsSource);

      const evaluator = new JexEvaluator({ env: "playground" }, customFunctions, customTransforms);
      evaluator.setCacheExpressions(true);

      const value = await Promise.resolve(evaluator.evaluate(expression, vars));
      setResult(String(value));
    } catch (err) {
      setResult("-");
      setError(err instanceof Error ? err.message : "Failed to evaluate expression.");
    }
  }

  function resetDemo() {
    setExpression(DEFAULT_EXPRESSION);
    setVariables(DEFAULT_VARIABLES);
    setFunctionsSource(DEFAULT_FUNCTIONS);
    setTransformsSource(DEFAULT_TRANSFORMS);
    setResult("-");
    setError("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          JexLang Playground
          <Badge variant="secondary">Interactive Demo</Badge>
        </CardTitle>
        <CardDescription>
          Uses official <code>jexlang-ts</code>. Define custom functions/transforms in JS object
          form and execute expressions with JSON context.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground">
          For this simple playground, custom functions/transforms intentionally omit the
          <code> ctx </code> parameter and directly use variables from the editor context.
          Under the hood, the wrapper maps your simplified function shape to JexLang runtime
          signatures.
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Expression</label>
          <Input value={expression} onChange={(event) => setExpression(event.target.value)} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Variables (Program Context JSON)</label>
          <Textarea
            className="min-h-32 font-mono text-xs"
            value={variables}
            onChange={(event) => setVariables(event.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {variableStatus.ok ? "✓" : "✗"} {variableStatus.message}
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Custom Functions (JS Object)</label>
          <Textarea
            className="min-h-40 font-mono text-xs"
            value={functionsSource}
            onChange={(event) => setFunctionsSource(event.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {functionStatus.ok ? "✓" : "✗"} {functionStatus.message}
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Custom Transforms (JS Object)</label>
          <Textarea
            className="min-h-32 font-mono text-xs"
            value={transformsSource}
            onChange={(event) => setTransformsSource(event.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {transformStatus.ok ? "✓" : "✗"} {transformStatus.message}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={runDemo} className="gap-2">
            <Play className="size-4" /> Run
          </Button>
          <Button onClick={resetDemo} variant="outline" className="gap-2">
            <RotateCcw className="size-4" /> Reset
          </Button>
        </div>

        <Separator />

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">RESULT</p>
            <p className="mt-2 font-mono text-2xl">{result}</p>
            {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
          </div>
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">TRY THESE</p>
            <p className="mt-2 text-xs text-muted-foreground">
              <code>greeting(user)</code>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <code>price * quantity | formatCurrency</code>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              <code>applyDiscount(500, 0.1)</code>
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 rounded-lg border bg-muted/20 p-3">
          <p className="text-xs font-medium text-muted-foreground">REAL LIBRARY USAGE</p>
          <pre className="overflow-x-auto rounded-md bg-background p-2 text-[11px] leading-relaxed">
{`import { JexEvaluator } from "jexlang-ts";
const evaluator = new JexEvaluator(
  { env: "prod" },
  {
    applyDiscount: (ctx, amount, rate) => Math.max(amount * (1 - rate), 40)
  },
  {
    formatCurrency: (input) => "$" + Number(input).toFixed(2)
  }
);
const output = evaluator.evaluate("applyDiscount(price, rate)", { price: 120, rate: 0.15 });`}
          </pre>
          <p className="text-xs text-muted-foreground">
            JexLang implementations are available for TypeScript and Java, with Swift support
            upcoming. Refer to the GitHub repository for the latest status and full docs.
          </p>
        </div>

        <div className="space-y-2 rounded-lg border bg-muted/20 p-3">
          <p className="text-xs font-medium text-muted-foreground">
            HOSTED (SEPARATE URL) USAGE
          </p>
          <pre className="overflow-x-auto rounded-md bg-background p-2 text-[11px] leading-relaxed">
{`<script type="module">
  import { JexEvaluator } from "https://cdn.jsdelivr.net/npm/jexlang-ts@1.0.1/dist/index.js";
  const evaluator = new JexEvaluator({}, { double: (ctx, x) => x * 2 }, {});
  console.log(evaluator.evaluate("double(21)"));
</script>`}
          </pre>
          <p className="text-xs text-muted-foreground">
            This page can be deployed as a standalone <code>/playground</code> route or split into
            a dedicated site URL.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
