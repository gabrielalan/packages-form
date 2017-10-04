import { PackagesFormPage } from './app.po';

describe('packages-form App', () => {
  let page: PackagesFormPage;

  beforeEach(() => {
    page = new PackagesFormPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
