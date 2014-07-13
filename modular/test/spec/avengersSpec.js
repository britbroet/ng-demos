describe('Avengers', function () {

    var scope,
        controller,
        dataservice,
        $httpBackend,
        $q,
        $rootScope,
        mockDataService;

    beforeEach(function () {
        module('app');

        mockDataService = {};

        inject(function (_$httpBackend_, _$q_, _$rootScope_, _dataservice_, _toastr_) {
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            dataservice = _dataservice_;
            toastr = _toastr_;

            //ignore all html calls
//            $httpBackend.expectGET('/app/dashboard/dashboard.html').respond(200, {});
            $httpBackend.expectGET(/\w+.html/).respond(200, '');
            $httpBackend.flush();

            spyOn(dataservice, 'getAvengers').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve(testctx.getMockAvengers());
                return deferred.promise;
            });

            spyOn(dataservice, 'ready').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve({test: 123});
                return deferred.promise;
            });
        });
    });


    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('Avengers as vm', {
            '$scope': scope,
            'dataservice': dataservice
        });
    }));

    it('should have title of Avengers', function () {
        $rootScope.$apply();
        expect(scope.vm.title).toEqual('Avengers');
    });

    it('should have 7 Avengers', function () {
        $rootScope.$apply();
        expect(scope.vm.avengers.length).toEqual(7);
    });

    afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});