using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShopAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeBasketItemEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketItems_Baskets_BasketEntityId",
                table: "BasketItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BasketItems_Products_ProductId1",
                table: "BasketItems");

            migrationBuilder.DropIndex(
                name: "IX_BasketItems_BasketEntityId",
                table: "BasketItems");

            migrationBuilder.DropIndex(
                name: "IX_BasketItems_ProductId1",
                table: "BasketItems");

            migrationBuilder.DropColumn(
                name: "BasketEntityId",
                table: "BasketItems");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "BasketItems");

            migrationBuilder.AddColumn<long>(
                name: "BasketId",
                table: "BasketItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_BasketItems_BasketId",
                table: "BasketItems",
                column: "BasketId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketItems_ProductId",
                table: "BasketItems",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketItems_Baskets_BasketId",
                table: "BasketItems",
                column: "BasketId",
                principalTable: "Baskets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BasketItems_Products_ProductId",
                table: "BasketItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasketItems_Baskets_BasketId",
                table: "BasketItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BasketItems_Products_ProductId",
                table: "BasketItems");

            migrationBuilder.DropIndex(
                name: "IX_BasketItems_BasketId",
                table: "BasketItems");

            migrationBuilder.DropIndex(
                name: "IX_BasketItems_ProductId",
                table: "BasketItems");

            migrationBuilder.DropColumn(
                name: "BasketId",
                table: "BasketItems");

            migrationBuilder.AddColumn<long>(
                name: "BasketEntityId",
                table: "BasketItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ProductId1",
                table: "BasketItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BasketItems_BasketEntityId",
                table: "BasketItems",
                column: "BasketEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_BasketItems_ProductId1",
                table: "BasketItems",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketItems_Baskets_BasketEntityId",
                table: "BasketItems",
                column: "BasketEntityId",
                principalTable: "Baskets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BasketItems_Products_ProductId1",
                table: "BasketItems",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
