using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class DealthyHallowsHub :Hub
    {
        public Dictionary <string,int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }
    }
}
