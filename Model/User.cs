using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class User
    {
        [Column("ID", TypeName = "int(11)")]
        public int Id { get; set; }

        [Column("name", TypeName = "varchar(32)")]
        public string Name { get; set; }

        [Column("passwd", TypeName = "varchar(64)")]
        public string Password { get; set; }

        [Column("Prompt", TypeName = "varchar(32)")]
        public string Prompt { get; set; } = "";

        [Column("answer", TypeName = "varchar(32)")]
        public string Answer { get; set; } = "";

        [Column("truename", TypeName = "varchar(32)")]
        public string Truename { get; set; } = "";

        [Column("idnumber", TypeName = "varchar(32)")]
        public string IdNumber { get; set; } = "";

        [Column("email", TypeName = "varchar(64)")]
        public string Email { get; set; } = "";

        [Column("mobilenumber", TypeName = "varchar(32)")]
        public string MobileNumber { get; set; } = "";

        [Column("province", TypeName = "varchar(32)")]
        public string Province { get; set; } = "";

        [Column("city", TypeName = "varchar(32)")]
        public string City { get; set; } = "";

        [Column("phonenumber", TypeName = "varchar(32)")]
        public string PhoneNumber { get; set; } = "";

        [Column("address", TypeName = "varchar(64)")]
        public string Address { get; set; } = "";

        [Column("postalcode", TypeName = "varchar(8)")]
        public string PostalCode { get; set; } = "";

        [Column("gender", TypeName = "int(11)")]
        public int Gender { get; set; } = 0;

        [Column("birthday", TypeName = "datetime")]
        public string Birthday { get; set; }

        [Column("creatime", TypeName = "datetime")]
        public string CreatedAt { get; set; }

        [Column("qq", TypeName = "varchar(32)")]
        public string Qq { get; set; } = "";
        
        [Column("passwd2", TypeName = "varchar(64)")]
        public string PasswordAgain { get; set; }

        [Column("mudev", TypeName = "varchar(32)")]
        public string MuDev { get; set; } = "";

        [Column("mmotop", TypeName = "varchar(32)")]
        public string MmoTop { get; set; } = "";

        [Column("avatar", TypeName = "varchar(255)")]
        public string Avatar { get; set; }

    }
}

//   `ID` int(11) NOT NULL DEFAULT '0',
//   `name` varchar(32) NOT NULL DEFAULT '',
//   `passwd` varchar(64) NOT NULL,
//   `Prompt` varchar(32) NOT NULL DEFAULT '',
//   `answer` varchar(32) NOT NULL DEFAULT '',
//   `truename` varchar(32) NOT NULL DEFAULT '',
//   `idnumber` varchar(32) NOT NULL DEFAULT '',
//   `email` varchar(64) NOT NULL DEFAULT '',
//   `mobilenumber` varchar(32) DEFAULT '',
//   `province` varchar(32) DEFAULT '',
//   `city` varchar(32) DEFAULT '',
//   `phonenumber` varchar(32) DEFAULT '',
//   `address` varchar(64) DEFAULT '',
//   `postalcode` varchar(8) DEFAULT '',
//   `gender` int(11) DEFAULT '0',
//   `birthday` datetime DEFAULT NULL,
//   `creatime` datetime NOT NULL,
//   `qq` varchar(32) DEFAULT '',
//   `passwd2` varchar(64) DEFAULT NULL,
//   `mudev` varchar(32) NOT NULL DEFAULT '',
//   `mmotop` varchar(32) NOT NULL DEFAULT '',
//   `avatar` varchar(255) DEFAULT NULL,