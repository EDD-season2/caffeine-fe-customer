export default class MenuItem {
  public id: string;
  private name: string;
  private nameInEnglish: string;
  private description: string;
  private image: string;
  public price: string;
  private category: string;

  private constructor (
    id: string,
    name: string,
    nameInEnglish: string,
    description: string,
    image: string,
    price: string,
    category: string
  ) {
    this.id = id
    this.name = name
    this.nameInEnglish = nameInEnglish
    this.description = description
    this.image = image
    this.price = price
    this.category = category
  }

  public static emptyMenuItem: MenuItem = new MenuItem(
    'empty_id',
    'empty_name',
    'empty_nameInEnglish',
    'empty_description',
    'empty_image',
    'empty_price',
    'empty_category'
  )

  public static ofJson (json: string) {
    return this.of(JSON.parse(json))
  }

  public static of (obj: any) {
    return new MenuItem(
      obj.id,
      obj.name,
      obj.nameInEnglish,
      obj.description,
      obj.image,
      obj.price,
      obj.category
    )
  }

  public toJson () {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      nameInEnglish: this.nameInEnglish,
      description: this.description,
      image: this.image,
      price: this.price,
      category: this.category
    })
  }
}
