describe('foo', function() {

    var foo;

    beforeAll(function() {
        foo = {a:3};
    });

    afterAll(function() {
        foo = null;
    });

    describe('object should', function() {

        it('return undefined when attempting to access a property that it does not have', function() {

            expect(foo.b).toBeUndefined();

        });

        it('return the stored value when accessing a property', function() {

            expect(foo.a).toBe(3);

        });

    });


});

