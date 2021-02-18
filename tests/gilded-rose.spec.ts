import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const result = 'foo';
    const gildedRose = new GildedRose([new Item(result, 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe(result);
  });

  describe("should create baseline test for Aged Brie", () => {
    const items = [
      new Item('Aged Brie', 2, 0),
    ]

    const result =new GildedRose(items).updateQuality()

    expect(result).toMatchObject([{name: 'Aged Brie', sellIn: 1, quality: 1}])

  })

  describe("should create baseline test for Sulfuras", () => {
    const items = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
    ]

    const result =new GildedRose(items).updateQuality()

    expect(result).toMatchObject([
      {name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
      {name: 'Sulfuras, Hand of Ragnaros', sellIn: -1, quality: 80 },
    ])

  })

  describe("should create baseline test for Backstage passes", () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
    ]

    const result =new GildedRose(items).updateQuality()

    expect(result).toMatchObject([
      new Item('Backstage passes to a TAFKAL80ETC concert', 14, 21),
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 50),
      new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50),
    ])

  })

  describe("should create baseline test for the other items", () => {
    const items = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Elixir of the Mongoose', 5, 7),
    ]

    const result =new GildedRose(items).updateQuality()

    expect(result).toMatchObject([
      new Item('+5 Dexterity Vest', 9, 19),
      new Item('Elixir of the Mongoose', 4, 6),
    ])

  })

});
