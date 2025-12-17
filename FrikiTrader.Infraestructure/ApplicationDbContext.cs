using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FrikiTrader.Domain;

namespace FrikiTrader.Infraestructure
{
    public class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        // DBset mapea las entidades de Domain a tablas de la base de datos
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ChatConversation> ChatConversations { get; set; }

        // Confihuración del mapeo avanzado
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // --- 1. Relación Múltiple en User/ChatConversation (User Id 1 y User Id 2) ---
            modelBuilder.Entity<ChatConversation>()
                .HasOne(cc => cc.InitiatorUser)
                .WithMany(u => u.ConversationInitiated)
                .HasForeignKey(cc => cc.InitiatorUserId)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Configura la relación entre ChatConvesarion y el usuario receptor
            modelBuilder.Entity<ChatConversation>()
                .HasOne(cc => cc.ReceiverUser)
                .WithMany(u => u.ConversationReceived)
                .HasForeignKey(cc => cc.ReceiverUserId)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // --- 2. Unicidad del Email (Clave UNIQUE en SQL) ---
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // 3. Configuración para el precio (Precisión Decimal)
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(10,2)"); // 10 dígitos en total, 2 decimales
        }
    }
}
