using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CovidTracking.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class ImagesPath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoPath",
                table: "Members",
                newName: "ImagePath");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Members",
                newName: "PhotoPath");
        }
    }
}
