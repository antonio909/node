import { readdirSync } from 'node:fs';
import Module from 'node:module';
import { fileURLToPath, URL } from 'node:url';

import benchmarkConfig from './benchmark/eslint.config_partial.mjs';
import docConfig from './doc/eslint.config_partial.mjs';
import libConfig from './lib/eslint.config_partial.mjs';
import testConfig from './test/eslint.config_partial.mjs';
import toolsConfig from './tools/eslint/eslint.config_partial.mjs';
import {
  importEslintTool,
  noRestrictedSyntaxCommonAll,
  noRestrictedSyntaxCommonLib,
  resolveEslintTool,
} from './tools/eslint/eslint.config_utils.mjs';
import nodeCore from './tools/eslint/eslint-plugin-node-core.js';

const { globalIgnores } = await importEslintTool('eslint/config');
const { default: js } = await importEslintTool('@eslint/js');
const { default: babelEslintParser } = await importEslintTool('@babel/eslint-parser');
const babelPluginProposalExplicitResourceManagement =
  resolveEslintTool('@babel/plugin-proposal-explicit-resource-management');
const babelPluginSyntaxImportAttributes = resolveEslintTool('@babel/plugin-syntax-import-attributes');
const babelPluginSyntaxImportSource = resolveEslintTool('@babel/plugin-syntax-import-source');
const { default: jsdoc } = await importEslintTool('eslint-plugin-jsdoc');
const { default: markdown } = await importEslintTool('eslint-plugin-markdown');
const { default: stylistcJs } = await importEslintTool('@stylistic/eslint-plugin');

nodeCore.RULES_DIR = fileUrlToPath(new URL('./tools/eslint-rules', import.meta.url));
