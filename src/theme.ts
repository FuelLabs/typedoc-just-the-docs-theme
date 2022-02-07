import * as path from 'path';
import { Renderer, DeclarationReflection, ReflectionKind, Reflection, PageEvent } from 'typedoc';
import { MarkdownTheme } from 'typedoc-plugin-markdown';

const FolderMapping = {
  [ReflectionKind.Module]: 'modules',
  [ReflectionKind.Namespace] : 'namespaces',
  [ReflectionKind.Enum]: 'enums',
  [ReflectionKind.Class]: 'classes',
  [ReflectionKind.Interface]: 'interfaces'
}

// Todo: make it a theme configuration
const NavOrder = {
  [ReflectionKind.Module]: 1,
  [ReflectionKind.Class]: 1,
  [ReflectionKind.Interface]: 2,
  [ReflectionKind.Namespace]: 3,
  [ReflectionKind.Enum]: 4
}

const normalizeName = (name: string) => {
  return name.replace('@', '').replace('/', '-');
}

export class JustTheDocsTheme extends MarkdownTheme {
  constructor(renderer: Renderer) {
    super(renderer);
  }

  toUrl(mapping: any, reflection: DeclarationReflection) {
    const [module, ...namaSpace] = reflection.getFullName()?.split('.');
    const moduleFolderName = normalizeName(module);

    let finalPath;
    if (!namaSpace.length) {
      finalPath = path.join(moduleFolderName, `index.md`);
    } else {
      finalPath = `${path.join(moduleFolderName, FolderMapping[reflection.kind], namaSpace.join('-'))}.md`;
    }
    
    return path.join(finalPath);
  }

  render(page: PageEvent<Reflection>) {
    const pageMarkdown = super.render(page);
    const [packageName, ...namaSpace] = page.model.getFullName()?.split('.');

    // Add YAML front matter 
    let header: string;
    if (!namaSpace.length) {
      header = [
        `---`,
        `layout: default`,
        `title: "${packageName}"`,
        `has_children: true`,
        `has_toc: false`,
        `nav_order: 1`,
        `---`,
      ].join('\n');
    } else {
      header = [
        `---`,
        `layout: default`,
        `title: ${page.model.name}`,
        `parent: "${packageName}"`,
        `nav_order: ${NavOrder[page.model.kind]}`,
        ``,
        `---`,
      ].join('\n');
    }

    return `${header}\n\n${pageMarkdown}`;
  }
}
