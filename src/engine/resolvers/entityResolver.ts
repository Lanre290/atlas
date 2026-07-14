import { Entity } from '../../models/entity';
import { SearchResult } from '../../models/searchResult';
import crypto from 'crypto';

export class EntityResolver {
  private readonly ALIAS_MAP: Record<string, string[]> = {
    'bennu': ['101955', '1999 rq36', 'bennu'],
    'halley': ['1p', 'halley', '1p/halley'],
  };

  resolve(resultsArr: (SearchResult[] | null)[]): Entity[] {
    // Flatten the array of arrays coming from the QueryEngine
    const rawResults = resultsArr.flat().filter(Boolean) as SearchResult[];
    const entities: Entity[] = [];

    for (const result of rawResults) {
      const extractedIdentifiers = this.extractIdentifiers(result.title);
      let matchedEntity = this.findMatchingEntity(entities, extractedIdentifiers);

      if (matchedEntity) {
        this.mergeResultIntoEntity(matchedEntity, result, extractedIdentifiers);
      } else {
        entities.push(this.createNewEntity(result, extractedIdentifiers));
      }
    }

    return entities;
  }

  private extractIdentifiers(title: string): string[] {
    const tokens = title.toLowerCase().split(/[\s-]+/);
    const identifiers = new Set<string>(tokens);

    for (const token of tokens) {
      for (const [canonicalName, aliases] of Object.entries(this.ALIAS_MAP)) {
        if (aliases.includes(token)) {
          aliases.forEach(alias => identifiers.add(alias));
          identifiers.add(canonicalName);
        }
      }
    }
    return Array.from(identifiers);
  }

  private findMatchingEntity(entities: Entity[], identifiers: string[]): Entity | undefined {
    return entities.find(entity => 
      entity.identifiers.some(id => identifiers.includes(id.toLowerCase()))
    );
  }

  private createNewEntity(result: SearchResult, identifiers: string[]): Entity {
    let canonicalName = result.title;
    for (const canonicalKey of Object.keys(this.ALIAS_MAP)) {
      if (identifiers.includes(canonicalKey)) {
        canonicalName = canonicalKey.charAt(0).toUpperCase() + canonicalKey.slice(1);
        break;
      }
    }

    return {
      id: crypto.randomUUID(),
      name: canonicalName,
      type: result.type,
      identifiers: identifiers,
      sources: [result.source],
      originalResults: [result]
    };
  }

  private mergeResultIntoEntity(entity: Entity, result: SearchResult, identifiers: string[]): void {
    entity.identifiers = Array.from(new Set([...entity.identifiers, ...identifiers]));
    if (!entity.sources.includes(result.source)) {
      entity.sources.push(result.source);
    }
    entity.originalResults.push(result);
  }
}