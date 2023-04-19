using AutoMapper;
using OnlineShopAPI.DTOs.Response;
using OnlineShopAPI.Entities;

namespace OnlineShopAPI.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BasketEntity, BasketResponseDto>();
            CreateMap<BasketResponseDto, BasketEntity>();
            CreateMap<ProductEntiy, ProductResponseDto>();
            CreateMap<ProductResponseDto, ProductEntiy>();
            CreateMap<BasketItemEntity, BasketItemResponseDto>();
            CreateMap<BasketItemResponseDto, BasketItemEntity>();
        }
    }
}
