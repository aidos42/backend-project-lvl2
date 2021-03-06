# Diff Generator

[![Actions Status](https://github.com/aidos42/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/aidos42/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e3e84cefad4ed4eef913/maintainability)](https://codeclimate.com/github/aidos42/backend-project-lvl2/maintainability)
![NodeCI](https://github.com/aidos42/backend-project-lvl2/workflows/NodeCI/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e3e84cefad4ed4eef913/test_coverage)](https://codeclimate.com/github/aidos42/backend-project-lvl2/test_coverage)

Compares two configuration files and shows a difference in desired format. 

Supported output formats:
- stylish
- plain
- json

Supported input formats:
- json
- yaml

### Usage
```
gendiff [options] <filepath1> <filexpath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

### Asciinema
[![asciicast](https://asciinema.org/a/bpJEaqVHxUEoFKJCUgMmSCr5p.svg)](https://asciinema.org/a/bpJEaqVHxUEoFKJCUgMmSCr5p)