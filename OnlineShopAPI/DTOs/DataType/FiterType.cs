namespace OnlineShopAPI.DTOs.DataType
{
    public enum FiterType : byte
    {
        None = 0,
        LowestPrice = 1,
        HighestPrice = 2,
        WithDiscount = 3,
        Favorites = 4,
        BestSelling = 5,
        Newest = 6,
    }
}
