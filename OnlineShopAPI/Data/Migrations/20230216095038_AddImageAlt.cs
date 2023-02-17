using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShopAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImageAlt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageAlt",
                table: "Products",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageAlt",
                table: "Products");
        }
    }
}
