module.exports = {
    root: true,
    // "parser": "@typescript-eslint/parser",
    parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    settings: {
        "react": {
          "version": "detect"
        }
    },
    plugins: [
        "react",
        "react-hooks",
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb/base',
        'airbnb-typescript/base',
        'prettier',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    rules: {
        // from the client repo: https://github.com/e-conomic/client/blob/master/.eslintrc.js
        'prefer-arrow-callback': [2, { allowNamedFunctions: true }], // Require arrow functions as callbacks
        'guard-for-in': 1, // Require for-in loops to include an if statement
        // Best Practices
        'prefer-promise-reject-errors': 1, // Require using Error objects as Promise rejection reasons
        'consistent-return': 1, // Require return statements to either always or never specify values
        'prefer-template': 1, // Require template literals instead of string concatenation
        'operator-assignment': 0, // Require or disallow assignment operator shorthand where possible
        // No-no section
        'no-console': 1, // Disallow the use of console
        'no-unsafe-optional-chaining': 1, // Unsafe arithmetic operation on optional chaining. It can result in NaN
        'no-empty': 1, // Disallow empty block statements
        // 'no-underscore-dangle': [1, { allow: ['__initialized'] }], // issue with useQuery __initialized
        // Imports
        'import/no-named-as-default': 1, // default error
        'import/no-cycle': 1,
        'import/no-default-export': 0,
        "import/extensions": 'off',
        // React
        'react-hooks/rules-of-hooks': 1, // !!!! MUST HAVE !!!!
        'react-hooks/exhaustive-deps': 1, // should be warning
        'react/prop-types': 1, // it is checking also TypeScript types
        'react/button-has-type': 1,
        'react/jsx-no-constructed-context-values': 1,
        'react/jsx-no-useless-fragment': [1, { allowExpressions: true }], // 40 left - Fragments should contain more than one child - otherwise, there’s no need for a Fragment at all
        'react/jsx-props-no-spreading': 0,
        'react/no-unstable-nested-components': [1, { allowAsProps: true }],
        'react/no-children-prop': 1,
        'react/no-array-index-key': 1,
        'react/no-unused-prop-types': 1,
        // TypeScript
        '@typescript-eslint/default-param-last': 1, // nice to have
        '@typescript-eslint/return-await': 1,
        '@typescript-eslint/unbound-method': 0, // Avoid referencing unbound methods which may cause unintentional scoping of `this`.
        '@typescript-eslint/lines-between-class-members': 0,
        // -> Requiring Type Checking
        '@typescript-eslint/ban-types': 1, // Boolean, Function, Object -> boolean, () =>, object or Record etc
        '@typescript-eslint/require-await': 1, // Async function has no 'await' expression
        '@typescript-eslint/restrict-template-expressions': 1, // Invalid type "number[]" of template literal expression
        '@typescript-eslint/restrict-plus-operands': 1,
        // -> Prefer
        '@typescript-eslint/prefer-nullish-coalescing': 0, // Prefer using nullish coalescing operator (`??`) instead of a logical or (`||`), as it is a safer operator
        // -> No-no
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-redeclare': 1,
        '@typescript-eslint/no-throw-literal': 0,
        '@typescript-eslint/no-unused-expressions': 1, // a && a.b(); instead of if (a) a.b(); or a?.b();
        '@typescript-eslint/no-explicit-any': 1, // Unexpected any. Specify a different type
        '@typescript-eslint/no-redundant-type-constituents': 1, // 'any' overrides all other types in this intersection type
        '@typescript-eslint/no-base-to-string': 1, // 'Xyz' will evaluate to '[object Object]' when stringified
        '@typescript-eslint/no-non-null-asserted-optional-chain': 1, // Optional chain expressions can return undefined by design - using a non-null assertion is unsafe and wrong
        '@typescript-eslint/no-unsafe-assignment': 0, // Unsafe assignment of an `any` value
        '@typescript-eslint/no-unsafe-argument': 0, // Unsafe argument of type `any` assigned to a parameter of type `object`
        '@typescript-eslint/no-for-in-array': 0, // For-in loops over arrays are forbidden. Use for-of or array.forEach instead
        '@typescript-eslint/no-unsafe-member-access': 0, // Unsafe member access .x on an `any` value
        '@typescript-eslint/no-unsafe-enum-comparison': 0, // The two values in this comparison do not have a shared enum type
        '@typescript-eslint/no-unsafe-call': 0, // Unsafe call of an `any` typed value
        '@typescript-eslint/no-unsafe-return': 0, // Unsafe return of an `any` typed value
        // -> Promises
        '@typescript-eslint/await-thenable': 1, // Unexpected `await` of a non-Promise (non-"Thenable") value
        '@typescript-eslint/no-floating-promises': 0, // Promises must be awaited
        '@typescript-eslint/no-misused-promises': 0, // Promise-returning function provided to attribute where a void return was expected
        // a11y
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
        'jsx-a11y/aria-role': 0,
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/control-has-associated-label': 0,
        'jsx-a11y/no-redundant-roles': 0,
        'jsx-a11y/tabindex-no-positive': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-noninteractive-tabindex': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        // Class components (legacy code)
        'react/sort-comp': 0, // (IN PACKAGE)
        'react/state-in-constructor': 0, // (IN PACKAGE)
        'react/no-unused-class-component-methods': 0, // (IN PACKAGE)
        'react/static-property-placement': 0, // (IN PACKAGE)
        'react/default-props-match-prop-types': 0, // (IN PACKAGE)

        // my override
        'no-underscore-dangle': [1, { allow: ['_app', '_utility', '_props'] }],
        'react/no-children-prop': 'off',
        'react/no-array-index-key': 'off',
        'no-bitwise': 'off',

        // my old config
        'no-unused-vars': 'off',
        semi: ['error'],
        'space-infix-ops': ['error', { int32Hint: false }],
        'rest-spread-spacing': ['error'],
        'no-whitespace-before-property': ['error'],
        'no-trailing-spaces': ['error'],
        'no-multiple-empty-lines': ['error'],
        'no-multi-spaces': ['error'],
        'no-tabs': ['error'],
        'no-var': ['error'],
        'no-useless-return': ['error'],
        'no-useless-escape': ['error'],
        'no-useless-constructor': ['error'],
        'no-useless-rename': ['error'],
        'no-useless-concat': ['error'],
        'no-useless-catch': ['error'],
        'no-script-url': ['error'],
        'no-nested-ternary': ['error'],
        'no-lonely-if': ['error'],
        'no-empty-function': ['error'],
        'max-params': ['error', { max: 4 }],
        'max-nested-callbacks': ['error'],
        'max-lines-per-function': ['error', { max: 400 }], // recommended is 50
        'max-depth': ['error'],
        'max-classes-per-file': ['error', 1],
        complexity: ['error', { max: 25 }], // default is 20
        'no-constructor-return': ['error'],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        '@typescript-eslint/triple-slash-reference': 'off',
        'prefer-const': ['warn'],
        'no-console': [
            'warn',
            {
                allow: ['group', 'groupEnd', 'groupCollapsed', 'info', 'warn', 'error'],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true,
            },
        },
    ],
};
