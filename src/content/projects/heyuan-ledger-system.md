---
title: Heyuan Ledger System
role: 'Solo developer: architecture, database design, and implementation'
summary: Billing and fleet management for an aggregates-hauling business, replacing paper trip sheets.
status: NDA
kind: Business system
nda: true
tech: [Next.js, TypeScript, Prisma, Supabase, Tailwind CSS]
order: 6
---

A billing and fleet-management system for an aggregates-hauling business.
Next.js and TypeScript on Supabase Postgres with Prisma, replacing paper trip
sheets with role-based logging, client billing, statement generation, and
receivables tracking.

## Problem

Trip records and billing were kept entirely on paper, with no shared visibility
into what had been logged or invoiced.

## Solution

A centralized ledger system for logging trips and managing billing, replacing
paper records with one digital system of record.

## Architecture

A Next.js app deployed on Vercel with authenticated, role-based access, so trip
and billing records stay centralized and tied to the staff member who logged
them.

## Outcome

Trip and billing data is now accessible from anywhere, with visibility into
staff activity that paper records never allowed.
