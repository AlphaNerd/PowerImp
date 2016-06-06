describe('angularjs homepage todo list', function() {
  it('should add change plug 1', function() {
    element(by.css('[value="add"]')).click();
    expect(todoList.count()).toEqual(3);
  });
});