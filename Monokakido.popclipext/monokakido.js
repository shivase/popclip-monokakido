"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.actions = void 0;

// Categories and Scopes list comes from https://www.monokakido.jp/ja/dictionaries/app/usage.html#usage_57
const { categories } = require("./categories.json");
const { scopes } = require("./scopes.json");

function translate(text, category, scope) {
  const url = encodeURI(`mkdictionaries:///?text=${text}&category=${category}&scope=${scope}`);
  popclip.openUrl(url, {app: 'jp.monokakido.Dictionaries'});
}

// our action
exports.actions = [{
  requirements: ['text'],
  code: (input, options) => {
    translate(input.text, options.destcategory, options.destscope);
    return null;
  }
}];

// the dynamically generated extension options
exports.options = (() => {
  const categories = categoryList();
  const categoryOption = {
    identifier: 'destcategory',
    label: '検索カテゴリー',
    type: 'multiple',
    valueLabels: categories.names,
    values: categories.categories,
    defaultValue: '',
    description: "検索のカテゴリーを指定して下さい"
  };

  const scopes = scopeList();
  const scopeOption = {
    identifier: 'destscope',
    label: '用例',
    type: 'multiple',
    valueLabels: scopes.names,
    values: scopes.scopes,
    defaultValue: '',
    description: "検索の用例を指定して下さい"
  };

  return [categoryOption, scopeOption];
})();

// build the category list from the json file
function categoryList() {
  const result = { categories: [], names: [] };
  for (const category of categories) {
    result.names.push(category.name);
    result.categories.push(category.category);
  }
  return result;
}

function scopeList() {
  const result = { scopes: [], names: [] };
  for (const scope of scopes) {
    result.names.push(scope.name);
    result.scopes.push(scope.scope);
  }
  return result;
}
