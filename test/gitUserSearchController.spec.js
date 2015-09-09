describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var ctrl;


  describe('when searching for a user', function() {

    var httpBackend;

    var gitHubSearchResponse = {

      "items" : [
        {
          "login": "tansaku",
          "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
          "html_url": "https://github.com/tansaku"
        },
        {
          "login": "stephenlloyd",
          "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
          "html_url": "https://github.com/stephenlloyd"
        }
      ]

    }

    beforeEach(function() {
      module(function($provide) {
      fakeSearch = jasmine.createSpyObj('fakeSearch', ['query']);
        $provide.factory('Search', function() {
          return fakeSearch;
        });
      });
    });

    beforeEach(inject(function($q, $rootScope) {
      scope = $rootScope;
      fakeSearch.query.and.returnValue($q.when( {data: gitHubSearchResponse }))
    }))

    beforeEach(inject(function($controller) {
      ctrl = $controller('GitUserSearchController');
    }));


    it('initialises with an empty search result and term', function() {
      expect(ctrl.searchResult).toBeUndefined();
      expect(ctrl.searchTerm).toBeUndefined();
    });


    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      scope.$apply();
      expect(ctrl.searchResult).toEqual(gitHubSearchResponse);
    });
  });

});

