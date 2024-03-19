class RectangularTower : Tower
{
    public RectangularTower(int height, int width) : base(height, width) { }

    public override void DisplayInfo()
    {
        if (Math.Abs(Height - Width) > 5)
        {
            Console.WriteLine($"Area: {Height * Width}");
        }
        else
        {
            Console.WriteLine($"Perimeter: {2 * (Height + Width)}");
        }
    }
}

