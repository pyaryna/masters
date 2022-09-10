namespace Shop.BLL.DTOs
{
    public class UserDto : BaseUserDto
    {
        public string Email { get; set; }

        public string Phone { get; set; }

        public bool IsActive { get; set; }
    }
}
