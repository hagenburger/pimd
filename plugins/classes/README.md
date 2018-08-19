# PIMD Classes Plugin

Adds HTML classes to code blocks and other elements.

## Example usage

````markdown
# Headline <?: .my-headline ?>

```html .my-code
<p>Example</p>
```

Lorem ipsum dolor sit amet. <?: .my-paragraph ?>
````

Results in:

```html
<h1 class="my-headline">Headline</h1>

<div class="pimd-example my-code">
  ...
</div>

<p class="my-paragraph">Lorem ipsum dolor sit amet.</p>
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
