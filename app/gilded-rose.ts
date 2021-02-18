export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// - "Aged Brie" actually increases in Quality the older it gets
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// - "Conjured" items degrade in Quality twice as fast as normal items
// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - The Quality of an item is never more than 50

export class GildedRose {
  items: Array<Item>; //can be made private readonly by cannot change by design

  constructor(items: Array<Item>) {
    this.items = items.slice(0);
  }

  updateQuality(): Array<Item> {
    const MaxEntries = 50;
    const minEntries = 0;
    const AgedBrie = "Aged Brie";
    const Sulfuras = "Sulfuras";
    const BackstagePasses = "Backstage passes";
    const Conjured = "Conjured";

    const setMinAndMaxRanges = (itm: Item): Item => {
      if (itm.quality > MaxEntries) {
        itm.quality = MaxEntries;
      }

      if (itm.sellIn < minEntries) {
        itm.sellIn = minEntries;
      }

      return itm;
    };

    const handleConjured = (itm: Item): Item => {
      if (!itm.name.startsWith(Conjured)) {
        throw new Error(
          `itm must starts with '${Conjured}' but is ${itm.name}`
        );
      }

      itm.quality = itm.quality - 2;
      if (itm.quality > 0) {
        itm.sellIn = itm.sellIn - 2;
      }
      if (itm.sellIn < 0) {
        itm.quality = itm.quality + 2;
      }

      itm = setMinAndMaxRanges(itm);

      return itm;
    };

    const handlePagedBrie = (itm: Item): Item => {
      if (!itm.name.startsWith(AgedBrie)) {
        throw new Error(`itm must start with '${AgedBrie}' but is ${itm.name}`);
      }

      itm.quality = itm.quality + 1;
      itm.sellIn = itm.sellIn - 1;
      if (itm.sellIn < 0) {
        itm.quality = itm.quality + 1;
      }

      itm = setMinAndMaxRanges(itm);

      return itm;
    };

    const handleBackstagePasses = (itm: Item): Item => {
      if (!itm.name.startsWith(BackstagePasses)) {
        throw new Error(
          `itm must start with '${BackstagePasses}' but is ${itm.name}`
        );
      }

      itm.quality = itm.quality + 1;
      if (itm.sellIn < 11) {
        itm.quality = itm.quality + 1;
      }
      if (itm.sellIn < 6) {
        itm.quality = itm.quality + 1;
      }
      itm.sellIn = itm.sellIn - 1;

      itm = setMinAndMaxRanges(itm);

      return itm;
    };

    const handleSulfuras = (itm: Item): Item => {
      if (!itm.name.startsWith(Sulfuras)) {
        throw new Error(`itm must start with '${Sulfuras}' but is ${itm.name}`);
      }
      if (itm.quality !== 80) {
        itm.quality = 80;
      }

      return itm;
    };

    const HandleDefault = (itm: Item): Item => {
      itm.quality = itm.quality - 1;
      if (itm.quality > 0) {
        itm.sellIn = itm.sellIn - 1;
      }
      if (itm.sellIn < 0) {
        itm.quality = itm.quality + 1;
      }

      itm = setMinAndMaxRanges(itm);

      return itm;
    };

    const handleItem = (itm: Item): Item => {
      if (itm.name.startsWith(AgedBrie)) {
        itm = handlePagedBrie(itm);
      } else if (itm.name.startsWith(BackstagePasses)) {
        itm = handleBackstagePasses(itm);
      } else if (itm.name.startsWith(Conjured)) {
        itm = handleConjured(itm);
      } else if (itm.name.startsWith(Sulfuras)) {
        itm = handleSulfuras(itm);
      } else {
        itm = HandleDefault(itm);
      }

      return itm;
    };

    this.items.forEach((itm) => {
      itm = handleItem(itm);
    });

    return this.items;
  }
}
