const presets = [
    ['@babel/env', {
    targets: { 
        edge: '17',
        ie: '11',
        firefox: '60',
        chrome: '67',
        safari: '11.1'
    },
    useBuiltIns: "usage",
    corejs: "3.7.0",
    }]
];

module.exports = { presets }; 