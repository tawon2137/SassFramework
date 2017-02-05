describe("테스트", function () {
    it("대상이 주식이어야 한다.",function () {
        var stock = new Stock();
        var investment = new Investment(
          {
            stock:stock
          }
        );
        expect(investment.stock).toBe(stock);
    });
});
