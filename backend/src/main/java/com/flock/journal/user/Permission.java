package com.flock.journal.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

  ADMIN_CREATE("admin:create"),
  ADMIN_READ("admin:read"),
  ADMIN_UPDATE("admin:update"),
  ADMIN_DELETE("admin:delete"),

  PROFESSOR_CREATE("professor:create"),
  PROFESSOR_READ("professor:read"),
  PROFESSOR_UPDATE("professor:update"),
  PROFESSOR_DELETE("professor:delete"),

  STUDENT_CREATE("student:create"),
  STUDENT_READ("student:read"),
  STUDENT_UPDATE("student:update"),
  STUDENT_DELETE("student:delete");

  @Getter
  private final String permissionName;
}
