import { PillboxPage } from './app.po';

describe('pillbox App', () => {
  let page: PillboxPage;

  beforeEach(() => {
    page = new PillboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
