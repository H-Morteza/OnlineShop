using AutoMapper;
using OnlineShopAPI.DTOs;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BasketEntity, BasketDto>();
            CreateMap<BasketDto, BasketEntity>();
            CreateMap<ProductEntiy, ProductDto>();
            CreateMap<ProductDto, ProductEntiy>();
            CreateMap<BasketItemEntity, BasketItemDto>();
            CreateMap<BasketItemDto, BasketItemEntity>();
        }
    }
}
