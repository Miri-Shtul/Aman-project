using System.Text;

class TriangularTower : Tower
{
    public TriangularTower(int height, int width) : base(height, width) { }

    public override void DisplayInfo()
    {
        Console.WriteLine("1. Calculate Perimeter");
        Console.WriteLine("2. Print Triangle");
        Console.Write("Choose an option: ");
        int option = Convert.ToInt32(Console.ReadLine());

        switch (option)
        {
            case 1:
                CalculatePerimeter();
                break;
            case 2:
                PrintTriangle();
                break;
        }
    }

    private void CalculatePerimeter()
    {
        int sideLength = (int)Math.Sqrt(Math.Pow(Height, 2) + Math.Pow(Width / 2.0, 2));
        int perimeter = 2 * sideLength + Width;
        Console.WriteLine($"Perimeter: {perimeter}");
    }
    public void PrintTriangle()
    {
        if (Width % 2 == 0 || Width >= 2 * Height)
        {
            Console.WriteLine("The triangle cannot be printed.");
            return;
        }

        Console.WriteLine(new string(' ', (Width - 1) / 2) + "*");

        int remainingHeight = Height - 2; 
        int starWidth = 3; 

        int incrementCount = (Width - 3) / 2;
        int rowsPerIncrement = remainingHeight / incrementCount;
        int extraRows = remainingHeight % incrementCount;

        for (int i = 0; i < incrementCount; i++)
        {
            int currentRows = rowsPerIncrement + (extraRows > 0 ? 1 : 0);
            if (extraRows > 0) extraRows--;

            for (int j = 0; j < currentRows; j++)
            {
                Console.WriteLine(new string(' ', (Width - starWidth) / 2) + new string('*', starWidth));
            }

            if (starWidth + 2 < Width)
            {
                starWidth += 2;
            }
        }

        if (Height > 1)
        {
            Console.WriteLine(new string('*', Width));
        }
    }

}
/*
width:5 height :4
print:
  *
 ***
 ***
*****
width:9 height :12
print:
    *
   ***
   ***
   ***
   ***
  *****
  *****
  *****
 *******
 *******
 *******
*********
width:11 height :12
print:
     *
    ***
    ***
    ***
    ***
   *****
   *****
  *******
  *******
 *********
 *********
***********
 */
