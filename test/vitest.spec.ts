import { describe, it, expect } from 'vitest';
import { AuditLoggerDefaultExporter } from '../src';

describe('AuditLog Module', () => {
    it('should create default exporter', () => {
        const exporter = new AuditLoggerDefaultExporter();
        expect(exporter).toBeDefined();
        expect(typeof exporter.sendAuditLog).toBe('function');
    });
});
