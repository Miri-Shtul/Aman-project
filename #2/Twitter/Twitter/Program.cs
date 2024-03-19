Console.WriteLine("Welcome to my Twitter town app");

while (true)
{
    Console.WriteLine("1. Rectangular Tower");
    Console.WriteLine("2. Triangular Tower");
    Console.WriteLine("3. Exit");
    Console.Write("Choose an option: ");
    int option = Convert.ToInt32(Console.ReadLine());

    if (option == 3) break;
   
    Console.Write("Enter tower width: ");
    int width = Convert.ToInt32(Console.ReadLine());
    Console.Write("Enter tower height: ");
    int height = Convert.ToInt32(Console.ReadLine());

    Tower tower = option switch
    {
        1 => new RectangularTower(height, width),
        2 => new TriangularTower(height, width),
        _ => throw new InvalidOperationException("Invalid option")
    };

    tower.DisplayInfo();
}


