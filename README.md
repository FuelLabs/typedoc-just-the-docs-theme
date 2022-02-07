# typedoc-just-the-docs-theme

This theme is made to work with the [jekyll](https://jekyllrb.com/) theme [just-the-docs](https://github.com/pmarsceill/just-the-docs). It also requires
[typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown) to work.

> Supports TypeDoc 0.22.x

### What is does?

```
Note this theme was not extensively tested and was made to cover a single use case.
```

- Generates github well organized path directory
- Append on each markdown page a `YML front matter` with specifies from `just-the-docs`.

### Requirements

- [typedoc](https://github.com/TypeStrong/typedoc)
- [typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown)

### Usage

```shell
npm install typedoc-just-the-docs-theme --save-dev
```

On `typedoc.json` file.

```json
{
  "theme": "just-the-docs"
}
```

### Road map

- [ ] Add tests
