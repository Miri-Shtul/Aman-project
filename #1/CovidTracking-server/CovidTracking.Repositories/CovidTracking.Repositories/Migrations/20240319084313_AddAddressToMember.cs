using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CovidTracking.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class AddAddressToMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Address_BuildingNumber",
                table: "Members",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address_Street",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_BuildingNumber",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Address_City",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Address_Street",
                table: "Members");
        }
    }
}
