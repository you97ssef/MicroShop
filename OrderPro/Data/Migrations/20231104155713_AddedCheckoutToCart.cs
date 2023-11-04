using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderPro.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedCheckoutToCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CheckedOut",
                table: "Carts",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckedOut",
                table: "Carts");
        }
    }
}
