abstract class Tower
{
    public int Height { get; protected set; }
    public int Width { get; protected set; }

    protected Tower(int height, int width)
    {
        Height = height;
        Width = width;
    }

    public abstract void DisplayInfo();
}