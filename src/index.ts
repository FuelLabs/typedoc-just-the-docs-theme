import { Application } from 'typedoc';
import { JustTheDocsTheme } from './theme';

export function load(app: Application) {
  app.renderer.defineTheme('just-the-docs', JustTheDocsTheme);
}
