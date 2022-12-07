// Categories and Scopes list comes from https://www.monokakido.jp/ja/dictionaries/app/usage.html#usage_57
const { categories, scopes, schemes } = require("./options.json");

function translate(text, category, scope, scheme) {
  const url = encodeURI(`${scheme}:///?text=${text}&category=${category}&scope=${scope}`);
  popclip.openUrl(url, {app: 'jp.monokakido.Dictionaries'});
}

// our action
exports.actions = [{
  requirements: ['text'],
  code: (input, options) => {
    translate(input.text, options.destcategory, options.destscope, options.destscheme);
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
    label: '検索種別',
    type: 'multiple',
    valueLabels: scopes.names,
    values: scopes.scopes,
    defaultValue: '',
    description: "検索の種別を指定して下さい"
  };

  const schemes = schemeList();
  const schemeOption = {
    identifier: 'destscheme',
    label: '検索辞書',
    type: 'multiple',
    valueLabels: schemes.names,
    values: schemes.schemes,
    defaultValue: 'mkdictionaries',
    description: "検索対象の辞書を指定して下さい"
  };

  return [categoryOption, scopeOption, schemeOption];
})();

// build the option list from the json file
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

function schemeList() {
  const result = { schemes: [], names: [] };
  for (const scheme of schemes) {
    result.names.push(scheme.name);
    result.schemes.push(scheme.scheme);
  }
  return result;
}
