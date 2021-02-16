using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace LocalShare.Models
{
    public class Session
    {
        [Key]
        public string Code { get; set; }
        public bool IsOpen { get; set; }

        public static Session CreateSession()
        {
            string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] generatedChars = new char[8];
            Random rand = new Random();

            for (int i = 0; i < generatedChars.Length; i++)
            {
                generatedChars[i] = allowedChars[rand.Next(allowedChars.Length)];
            }

            return new Session(){ Code = new String(generatedChars), IsOpen = true };
        }
    }
}