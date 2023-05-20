package com.flock.journal.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tokens")
public class Token {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "token_id")
  private Long id;

  @Column(name = "value")
  private String value;

  @Enumerated(EnumType.STRING)
  @Column(name = "type")
  private TokenType type;

  @Column(name = "is_expired")
  private boolean isExpired;

  @Column(name = "is_revoked")
  private boolean isRevoked;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
