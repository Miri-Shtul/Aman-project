using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CovidTracking.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_MemberId",
                table: "Vaccinations",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_CovidDetails_MemberId",
                table: "CovidDetails",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_CovidDetails_Members_MemberId",
                table: "CovidDetails",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccinations_Members_MemberId",
                table: "Vaccinations",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CovidDetails_Members_MemberId",
                table: "CovidDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Vaccinations_Members_MemberId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_Vaccinations_MemberId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_CovidDetails_MemberId",
                table: "CovidDetails");
        }
    }
}
