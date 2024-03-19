
using CovidTracking.Repositories.Entities;
using CovidTracking.Repositories.Interfaces;
using CovidTracking.WebApi;
using CovidTracking.Repositories;
using CovidTracking.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
{
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));
builder.Services.AddDbContext<IContext, MyDbContext>();
builder.Services.AddRepository();
builder.Services.AddServices();
builder.Services.AddAutoMapper(typeof(Mapping));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.Run();
